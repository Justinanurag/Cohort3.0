let count =0;

const updateClock=()=>{
    const now =new Date();
    //24-Hr Formate
     const hh24 = String(now.getHours()).padStart(2, '0');// podStart is used to "05" insted of "5" show only
  const mm = String(now.getMinutes()).padStart(2, '0');
  const ss = String(now.getSeconds()).padStart(2, '0');
  const Time24=`${hh24}::${mm}::${ss}`
//   //12 hr formate with AM/PM
//   const hh12=now.getHours()%12||12;
//   const ss12=now.getHours()%12||12;
//   const mm12=now.getHours()%12||12;
  console.clear(); // Clear previous time
  console.log(`24-hour format: ${time24}`);


}