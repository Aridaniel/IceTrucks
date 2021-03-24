import React from 'react';

export default function Truck({ truckData }) {
  console.log(truckData);
  return (
    <>
      <h1>Truck Details</h1>
      <div>{truckData.response.name}</div>
      <div>{truckData.response.email}</div>
      <div>{truckData.response.menu}</div>
      <div>{truckData.response.phone}</div>
      <div>{truckData.response.description}</div>
      <div>{truckData.response.tags[0]}</div>
    </>
  );
}

export async function getStaticPaths() {
  // Return a list of possible value for id
  const data = await fetch(
    !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/api/truck'
      : 'https://ice-trucks.herokuapp.com/api/truck'
  );
  const response = await data.json();
  const idArray = response.data.map((truck) => {
    return {
      params: {
        id: truck._id,
      },
    };
  });
  console.log('ARrayyy', idArray);
  return {
    paths: idArray,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id
  const id = params.id;
  const data = await fetch(
    !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
      ? `http://localhost:3000/api/truck/${id}`
      : `https://ice-trucks.herokuapp.com/api/truck/${id}`
  );
  const response = await data.json();
  const truckData = { id, response };
  return {
    props: {
      truckData,
    },
  };
}
