

import TestDonut from '@/components/shared/TestDonut';
import React from 'react'


async function Home() {
  




  return (
    <>
      <main>
        <h1>Home</h1>
        {typeof document !== "undefined" && typeof localStorage !== "undefined" && (
          <p>{document.querySelector('html')?.getAttribute('data-theme')}
            {localStorage.getItem('theme')}
          </p>
        )}
        
          {/* <TestDonut /> */}
      
      </main>
    </>
  );
}

export default Home