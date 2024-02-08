import * as styles from './feedbackItem.css'

import { Link } from 'react-router-dom'

function FeedbackItem(props) {
  return (
    <Link className={styles.feedbackLink} to={`/feedback/${props.id}`}>
      <div className={styles.feedbackCard}>
        
        <div className={styles.feedbackCardCardContent}>
          <h2 className={styles.feedbackCardTitle}>{props.username}</h2>
          <p>{props.email}</p>
        </div>
      </div>
    </Link>
  )
}

export default FeedbackItem