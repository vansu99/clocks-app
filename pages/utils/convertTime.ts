import moment from 'moment';

// timer la 1 object
function convertTime(timer: any) {
  let time = moment(Object.values(timer).join(':'), 'HH:mm:ss').toISOString();
  return moment(time).format("HH:mm:ss")
}

export default convertTime;