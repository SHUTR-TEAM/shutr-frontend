
import Image from "next/image";
import styles from "./index.module.css";
import { /*useEffect,*/ useState } from "react";
import { /*Heading, */ Pencil,Plus, Star } from "lucide-react";


interface ProfileHeaderProps {
  id: string;
  name: string;
  coverImageUrl : string ;
  profileImageUrl : string ;
  
  
}


export default function ProfileHeader({
  //id,
  name,
  coverImageUrl ,
  profileImageUrl ,
  
}: ProfileHeaderProps)   {

  

  //const data = useSelector((state:RootState) => state.portfolio.);
  //const status = useSelector((state: RootState) => state.portfolio.status);


  //const [profileImage, setProfileImage] = useState("/pro.png");
  //const [coverImage, setCoverImage] = useState("/pbg.png");
  //const [userName,setUserName] = useState("Photographer name");
  const [totalReviews/*,setTotalReviews*/] = useState(1); 

 

    const //rating = 4,
    fullStarColor = 'yellow', // Customizable full star color
    emptyStarColor = 'gray',  // Customizable empty star color
    //reviewCountColor = 'yellow', // Customizable review count color
    colour= 'yellow'

    const fullStars = /*Math.floor(rating) */3;
    const hasHalfStar = /*rating % 1 >= 0.5 */ true;




    
    
    
    

  return (

   <div>
      {/* Cover Photo */}
      <div className={styles.background_image}>
        <Image
          //src={coverImage}
          src={coverImageUrl ||  "/pbg.png"}
          alt="Cover image"
          width={1540}
          height={350}
          
        />
        <button className={styles.background_pencil}>
          <Pencil size={30} color="darkblue" />
        </button>
      </div>

      {/* Profile Image */}
      <div className={styles.photographer_profilePic_info}>
        <Image
          //src={profileImage}
          src={profileImageUrl || "/pro.png"}
          alt="profile image"
          height={250}
          width={240}   
          className="rounded-full object-cover w-full h-full"
        />
        <button className={styles.profile_editor }>
          <Plus size={40} color="darkblue" />
        </button>
      </div>
       
      <div className= {styles.photographer_info} >
            <h1>{name} </h1>
           
      </div>

    <div className= {styles.rate} >
      
        <ul className={styles.list}>
        <li>{[...Array(5)].map((_, index) => (
          <span 
            key={index}
            className={` ${
              index < fullStars 
                ?  fullStarColor 
                : index === fullStars && hasHalfStar 
                ? emptyStarColor
                : fullStarColor
            }` }
          >
            <Star size={20} color={colour} fill={colour}/>
          </span>
        ))}
        {totalReviews > 0 && (
        <span className={styles.review }  >
          ({totalReviews.toLocaleString()})
        </span>

    )}
        </li>
      </ul>
      
    </div>
    
   </div>

  );
}

