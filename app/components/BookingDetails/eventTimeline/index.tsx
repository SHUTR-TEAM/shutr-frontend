"use client"
import { FC, useState } from 'react';
import { FaPlus } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import styles from './index.module.css';


const EventTimeline: FC = () => {

  //used to store the events
  const [eventList,setEventList]=useState<{time: string, occasion: string}[]>([])

  //create a newEvenet var to store the event details
  const [newEvent,setNewEvent]=useState({
    time:"",
    occasion:""
  });

  //this state use to update the boolean value
  const [showInput,setShowInput] = useState(false); 
  

  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    console.log(e.target)
    //name refers to the name attribute of the input field.
    //value is the current value entered in the input field.
    const { name ,value } =e.target;
    setNewEvent({ ...newEvent ,[name]:value}) ;   
  };

  const addEvent = ()=>{
    setEventList([...eventList, newEvent]);
    setNewEvent({ time: "", occasion: "" });
    setShowInput(false);
  };

  const showInputField =()=>{
    setShowInput(true)
  };


  const close =()=>{
    setShowInput(false)
  };


  return (
    <div className={styles.timeline}>

      <div className={styles.topic}>
        <h2>Event Timeline</h2>
        <span className={styles.plus} onClick={showInputField}><FaPlus /></span>
      </div>
      {/*this part only shows when click the plus icon
      if the showinput state is true , the code inside the parentheses will be rendered.
      && -if the left-hand condition is true, then render the right-hand expression.*/}
      {showInput && (
        <div className={styles.inputContainer}>
          <div >
            <IoMdCloseCircle onClick={close} className={styles.icon} />
          </div>
          <div className={styles.box}>
            <input 
              type="text"
              name="time"
              placeholder="Time"
              value={newEvent.time}
              onChange={handleInputChange}
              className={styles.inputBoxTime}
            />
            <input
              type="text"
              name="occasion"
              placeholder="Occasion"
              value={newEvent.occasion}
              onChange={handleInputChange}
              className={styles.inputBoxOccasion}
            />
          </div>
          <div className={styles.btn} >
            <button onClick={addEvent}>Add Event</button>
          </div>

        </div>
      )}

      <div className={styles.events}>
        <ul>
          {eventList.map((event,index)=>(
            <li key={index}>
              <div className={styles.time}>{event.time}</div>
              <div className={styles.event}>{event.occasion}</div>
            </li>
          ))}
        </ul>
      </div> 
         
    </div>
  );
};

export default EventTimeline;