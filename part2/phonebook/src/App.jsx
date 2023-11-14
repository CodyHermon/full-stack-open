import { useEffect, useState } from 'react';

import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import personsService from './services/persons';
import './index.css';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personsService
      .getAll()
      .then((response) => {
        setPersons(response);
      })
      .catch((error) => {
        setErrorMessage(error);
      });
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const addPerson = (e) => {
    e.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber,
    };

    const existingPerson = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with new one?`
        )
      ) {
        personsService
          .update(existingPerson.id, personObject)
          .then((returnedPerson) => {
            if (!returnedPerson) {
              setErrorMessage(
                `Information of '${existingPerson.name}' has already been removed from server`
              );
              setTimeout(() => {
                setErrorMessage(null);
              }, 5000);
              return;
            }
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : returnedPerson
              )
            );
            setNotificationMessage(
              `Changed ${newName}'s number to ${newNumber}`
            );
            setNewName('');
            setNewNumber('');
            setTimeout(() => {
              setNotificationMessage(null);
            }, 5000);
          })
          .catch((e) => {
            if (e.response.status === 400) {
              setErrorMessage(e.response.data.error);
              setTimeout(() => {
                setErrorMessage(null);
              }, 5000);
            }
          });

        return;
      }
    } else {
      personsService
        .create(personObject)
        .then((returnedPerson) => {
          setNotificationMessage(`Added ${newName}`);
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
          setPersons(persons.concat(returnedPerson));
        })
        .catch((e) => {
          setErrorMessage(e.response.data.error);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
    }
  };

  const deletePerson = (id) => {
    const person = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      personsService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => {
          setErrorMessage(
            `Note '${person.name}' was already removed from server`
          );
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
          console.log(error);
        });
    }
  };

  const phoneList = persons.filter((person) =>
    person?.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        successMessage={notificationMessage}
        errorMessage={errorMessage}
      />
      <Filter filter={filter} onChangeFilter={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <Persons persons={phoneList} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
