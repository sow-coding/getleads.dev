import { createClient } from '@/utils/supabase/server'
import React from 'react'

async function Purchase() {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser()
  const userId = data.user?.id

  return (
    <>
        <h1 style={{margin: "20px 1px"}}>Thank you for testing getleads.dev</h1>
        <p>Your trial period has just ended, to continue using getleads.dev you need to subscribe.</p>

        <a style={{textDecoration: "none"}} href={`https://swos.lemonsqueezy.com/buy/b46b64ec-9c60-4e5f-968a-1b7ec399e3b0?checkout[custom][nkn]=${userId}`}>
        <div className="divText" style={{marginTop: "40px", padding: "13px 40px"}}>
        <p>Get getleads.dev</p>
        <svg style={{marginLeft: "15px"}} xmlns="http://www.w3.org/2000/svg" width="18" height="15" viewBox="0 0 18 15" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M17.7806 8.03063L11.0306 14.7806C10.7376 15.0737 10.2624 15.0737 9.96937 14.7806C9.67632 14.4876 9.67632 14.0124 9.96937 13.7194L15.4397 8.25H0.75C0.335786 8.25 0 7.91421 0 7.5C0 7.08579 0.335786 6.75 0.75 6.75H15.4397L9.96937 1.28062C9.67632 0.987569 9.67632 0.512431 9.96937 0.219375C10.2624 -0.0736809 10.7376 -0.0736809 11.0306 0.219375L17.7806 6.96937C17.9215 7.11005 18.0006 7.30094 18.0006 7.5C18.0006 7.69906 17.9215 7.88995 17.7806 8.03063Z" fill="white"/>
        </svg>
      </div>
      </a>
    </>
  )
}

export default Purchase