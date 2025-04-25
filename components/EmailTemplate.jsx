import React from 'react'

const EmailTemplate = ({ email, message }) => {
  return (
    <div>
        <h2>FROM: {email}</h2>
        <hr />
        <h3>Feedback: </h3>
        <p>{message}</p>
    </div>
  )
}

export default EmailTemplate