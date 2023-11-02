import soundMessage from '../assets/notificationSound.mp3'

const allowNotification = async () : Promise<void> => {
  if(Notification.permission !== 'granted'){
    const requestPermission : NotificationPermission = await Notification.requestPermission();
  }
};

const showNotification = (title : string, body : string) => {
  const notification = new Notification(title, {body, dir:'ltr'});
  const notificationSound = new Audio(soundMessage);
  notificationSound.play();
  notification.addEventListener('click', () => {
    focus();
    notification.close();
  })
}

export {allowNotification, showNotification}