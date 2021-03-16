import React from 'react'
import Link from 'next/link';
function allFoodTrucks() {
    return (
      <div>
        <h1>This is an example page</h1>
        <Link href='/'>
          <a>Home</a>
        </Link>
      </div>
    );
}

export default allFoodTrucks
