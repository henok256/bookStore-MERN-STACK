import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton"
import {useState, useEffect} from 'react';
import axios from 'axios';
import Spinner from "../components/Spinner";


const EditBook = () => {
  const [title, setTitle]=useState('');
  const [author, setAuthor]=useState('');
  const [publishedYear, setPublishedYear]=useState();
  const [loading, setLoading]= useState(true);
  const [book, setBook] = useState({});
  
  const navigate= useNavigate();
  const {id} = useParams();

  useEffect(()=>{
    axios.get(`http://localhost:5555/books/${id}`)
         .then((response)=>{
          const fetchedData=response.data.book;
          setBook(fetchedData);
          setAuthor(fetchedData.author);
          setTitle(fetchedData.title) ;
          setPublishedYear(fetchedData.publishedYear)
          setLoading(false);
         }).catch((error)=>{
          console.log("Error", error);
          setLoading(false);
         })   
  },[id]);

  const handleChange=()=>{
    const editedData={
      title:title,
      author:author ,
      publishedYear:publishedYear
    };
    axios.put(`http://localhost:5555/books/${id}`,editedData)
    .then(()=>{
       //setBook(editedData);
       setLoading(false)
       alert('you successfully updated the book');
       navigate('/');
    }).catch((error)=>{
      console.log('Error', error);
    });
  };


  return (
    <div>
      <div><BackButton/></div>
      {loading? <Spinner/>:
      <div>
      <input type="text"  value={title} onChange={e=>setTitle(e.target.value)}/>
      <br/>
      <input type="text" value={author} onChange={e=>setAuthor(e.target.value)}/>
      <br/>
      <input type="text"  value={publishedYear} onChange={e=>setPublishedYear(e.target.value)}/>
      <br />
      <button onClick={handleChange}>save changes</button>
   </div>
      }
  
      </div>
  )
}

export default EditBook