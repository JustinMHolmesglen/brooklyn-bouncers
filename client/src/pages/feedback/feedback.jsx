import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';

// Local modules
import * as styles from "../product/ProductDetail.css";
import feedbackService from '../../services/feedbackService';
import TuLoader from '../../components/common/TuLoader';


function FeedbackDetail() {
  // CUSTOM HOOKS
  
  const params = useParams();
  

  // STATE INIT
  const [feedbackData, setFeedbackData] = useState({
    id: params.id,
    username: "",
    phone: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  // Destructure data state nested object properties
  const { id, username, phone, email, message } = feedbackData;

  // HOOK: Prevention of useEffect calling TWICE (React v18)
  const effectRan = useRef(false);
  useEffect(() => {
    console.log("Effect Ran");
    if (effectRan.current === false) {
      fetchedFeedback();
      setLoading(false);

      // CLEAN UP FUNCTION
      return () => {
        console.log("Unmounted");
        effectRan.current = true;
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // FUNCTIONS
  // [1] PAGE POPULATION
  async function fetchedFeedback() {
    try {
      const response = await feedbackService.getById(id);
      const fetchedFeedback = await response.data
      console.log(fetchedFeedback);

      // Using the spread, we create a shallow copy of the original object & overwrite/add with new data
      // NOTE: We could just do setData({...productData, ...fetchedCurrency}), but the dependency array then has issues!
      // NOTE: Specifically, we pass a function that has a first param (productData) same as the current value of the state, and we set it to state we want in the return of the function!
      setFeedbackData(feedbackOnMount => ({...feedbackOnMount,...fetchedFeedback}));

    } catch (err) {
      console.log(err?.response);
      setError(true);
    }
  }

  // CONDITIONAL LOAD: ERROR
  if (error) {
    return (
      <Container className="text-center">
        <p>Error page</p>
      </Container>
    )
  }

  // CONDITIONAL LOAD: LOADING
  if (loading) {
    return (
      <Container className="text-center">
        <TuLoader />
      </Container>
    )
  }

  return (
    <Container>
      {/* MAIN PRODUCT SECTION */}
      <div className={styles.productBox}>
      
        {/* TEXT & DETAILS AREA: RIGHT */}
        <div className={styles.productBoxRight}>
          {/* HERO BOX */}
          <div className={styles.productHeroContainer}>
            <h2>{username}</h2>
            <p>{phone}</p>
            <p>{email}</p>
            <p>{message}</p>
          </div>

       
        </div>
      </div>
    </Container>
  )
}

export default FeedbackDetail