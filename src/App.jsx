import React from 'react'
import LegalServicesApp from './LegalServicesApp'
import { Helmet } from 'react-helmet-async'

export default function App() {
  return (
    <>
      <Helmet>
        <title>LEGAL_SYSTEM_QA | Autonomous Legal Intelligence</title>
        <meta name="description" content="Premium Legal Services Web App in Qatar. Autonomous Legal Intelligence." />
      </Helmet>
      <LegalServicesApp />
    </>
  )
}
