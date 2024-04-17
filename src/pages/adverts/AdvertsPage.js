import getAdverts from "./service.js"


const AdvertsPage = () => {
  console.log('Adverts Page Loaded')

  const adverts = [
    {
      id: '26c747f1-4d6d-4805-a0f6-126d1e0da652',
      createdAt: '2024-04-17T07:33:17.000Z',
      name: 'Bicicleta de Carretera Talla M',
      sale: true,
      price: 1500,
      tags: ['lifestyle'],
      photo: 'http://localhost:3001/public/1713339197834-434660129.jpg',
    },
  ]

  // const adverts = getAdverts()

  return (
    <div className='list-wrapper'>
      {adverts.map(advert => (
        <div key={advert.id} className="item-card">
            <p>{advert.name}</p>
        </div>
      ))}
    </div>
  )
}

export default AdvertsPage
