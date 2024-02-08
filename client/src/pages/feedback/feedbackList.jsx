import * as styles from './feedbackList.css'
import FeedbackItem from "./feedbackItem"


function feedbackList({ feedback }) {
  return (
    <div className={styles.gridContainer}>
      <div className={styles.productGrid}>
        {feedback.length === 0 && <p>Empty cart...</p>}
        {feedback.length > 0 && feedback.map(feedback => 
          <FeedbackItem 
          key={feedback.id}
          id={feedback.id}
          username={feedback.username}
          phone={feedback.phone}
          email={feedback.email}
          message={feedback.message}
          
          />
        )}
      </div>
    </div>
  )
}

export default feedbackList
