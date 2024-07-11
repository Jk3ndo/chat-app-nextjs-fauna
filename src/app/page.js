import styles from "./page.module.css";
import { Client, fql } from "fauna";
import { cookies } from "next/headers";
import RoomList from "./components/RoomList";
import { redirect } from "next/navigation";

export default async function Home() {

  const token = cookies().get('chat-app')?.value;

  if (!token) {
    redirect('/signin');
  }
  
  const client = new Client({ secret: token });
  
  const roomsResponse = await client.query(fql`
    Room.all()
  `);

  const rooms = roomsResponse.data?.data ?
  roomsResponse.data.data.map(room => ({
    id: room.id,
    name: room.name
  })) : [];

  const createNewRoom = async (formData) => {
    'use server'
    const token = cookies().get('chat-app')?.value;

    const client = new Client({ secret: token });
    try {
      const roomName = formData.get('roomName');
      const newroom = await client.query(fql`
        Room.create({
          name: ${roomName},
        })
      `);
      console.log(newroom)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <form action={createNewRoom}>
          <input
            type="text"
            placeholder="Nom de la salle"
            name="roomName"
          />
          <button type="submit" >Créer une salle</button>
        </form>
        <RoomList rooms={rooms} token={token} />
      </div>
    </main>
  );
}
