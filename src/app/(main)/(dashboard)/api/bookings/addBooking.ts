import { adminAxios } from "@/lib/axios";
import { useMutation } from "react-query";



interface bookindProp {
  data: {
    location: string,
    dive_level: string;
    dive_event_id: string;
    event_date_id: string;
    instructor_id: string;
    first_name: string;
    last_name: string;
    email: string;
    other_participants: Otherparticipant[];
    book_now: boolean;
    lang?: string;
  }
}

interface Otherparticipant {
  first_name: string;
  last_name: string;
  email: string;
  dob: string;

}




const addBooking = async ({ data: { book_now, dive_event_id, dive_level, location, email, event_date_id, first_name, instructor_id, last_name, other_participants, lang } }: bookindProp) => {
  const response = await adminAxios.post(`/dive/dive-booking/add`, {
    book_now, dive_event_id, dive_level, email, event_date_id, first_name, instructor_id, last_name, other_participants, lang,
    contact_info: {
      location
    },
    // book_now:"true",
  });
  return response.data;
}

export const useAddBooking = () => {
  return useMutation({
    mutationFn: addBooking,
  });
};