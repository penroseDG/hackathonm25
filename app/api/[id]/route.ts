import type { NextApiRequest, NextApiResponse } from 'next'
import products from '../../database/products.json'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  const product = products.find((prod: { id: number }) => prod.id === parseInt(id as string))

  switch (req.method) {
    case 'GET':
      if (product) {
        res.status(200).json(product)
      } else {
        res.status(404).json({ message: 'Product not found' })
      }
      break
    case 'PUT':
      const index = products.findIndex(prod => prod.id === parseInt(id as string))
      if (index !== -1) {
        products[index] = { ...products[index], ...req.body }
        res.status(200).json(products[index])
      } else {
        res.status(404).json({ message: 'Product not found' })
      }
      break
    case 'DELETE':
      const deleteIndex = products.findIndex(prod => prod.id === parseInt(id as string))
      if (deleteIndex !== -1) {
        const deletedProduct = products.splice(deleteIndex, 1)
        res.status(200).json(deletedProduct)
      } else {
        res.status(404).json({ message: 'Product not found' })
      }
      break
    default:
      res.status(405).json({ message: 'Method not allowed' })
      break
  }
}