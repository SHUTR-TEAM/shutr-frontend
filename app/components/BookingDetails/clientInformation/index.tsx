// components/ClientInformation.tsx
import { FC } from 'react';
import { FaRegUser } from 'react-icons/fa';
import { MdOutlineMailOutline, } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import styles from './index.module.css';

interface ClientInfo {
  name: string;
  email: string;
  phone: string;
}
/**
 * Props interface for the ClientInformation component.
 * @interface ClientInformationProps
 * @property {ClientInfo[]} clients - An array of client information objects to be displayed in the component.
 */
interface ClientInformationProps {
  clients: ClientInfo[];
}

const ClientInformation: FC<ClientInformationProps> = ({ clients }) => {
  return (
    <>
      <div className={styles.clientInfo}>
        <div className={styles.topic}>
          <h2>Client Information</h2>
        </div>
        {clients.map((client, index)=>(
          <div  key={index} className={styles.userDetails}>
            <p><FaRegUser className={styles.icon} />{client.name}</p>
            <p><MdOutlineMailOutline className={styles.icon} />{client.email}</p>
            <p><IoCallOutline className={styles.icon} />{client.phone}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ClientInformation;