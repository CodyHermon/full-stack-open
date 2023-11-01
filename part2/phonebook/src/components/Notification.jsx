const Notification = ({ errorMessage, successMessage }) => {
  if (errorMessage === null && successMessage === null) {
    return null;
  }

  return (
    <div className={errorMessage ? 'error' : 'success'}>
      {errorMessage || successMessage}
    </div>
  );
};

export default Notification;
