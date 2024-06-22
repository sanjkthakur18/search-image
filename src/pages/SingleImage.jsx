import React, { useEffect, useRef } from 'react'
import { fabric } from 'fabric'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const SingleImage = () => {
    const { id } = useParams()
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = new fabric.Canvas(canvasRef.current)

        const loadImage = async () => {
            try {
                const response = await axios.get(`https://api.pexels.com/v1/photos/${id}`, {
                    headers: {
                        Authorization: 'Gtm8Af5dgTo9oHxfz3nb9FaH1znv412kAXSoA1dNQ3WkEhhdUycbmFlR'
                    }
                })
                
                const img = new Image()
                img.crossOrigin = 'anonymous'
                img.src = response.data.src.original
                img.onload = () => {
                    const fabricImage = new fabric.Image(img)
                    const aspectRatio = fabricImage.width / fabricImage.height
                    const maxWidth = window.innerWidth * 0.9
                    const maxHeight = window.innerHeight * 0.7

                    let imgWidth, imgHeight

                    if (aspectRatio >= 1) {
                        imgWidth = maxWidth
                        imgHeight = maxWidth / aspectRatio
                    } else {
                        imgHeight = maxHeight
                        imgWidth = maxHeight * aspectRatio
                    }

                    canvas.setWidth(imgWidth)
                    canvas.setHeight(imgHeight)

                    fabricImage.set({ left: 0, top: 0 })
                    fabricImage.scaleToWidth(imgWidth)
                    canvas.add(fabricImage)
                    canvas.renderAll()
                    layers()
                }
            } catch (error) {
                console.error('Error loading image:', error)
            }
        }

        const layers = () => {
            const layers = canvas.getObjects().map((obj, index) => {
                return { type: obj.type, index, details: obj }
            })
            console.log(layers)
        }

        loadImage()

        document.getElementById('add-text').onclick = () => {
            const text = new fabric.Textbox('Add your caption here', {
                left: 50,
                top: 50,
                width: 200,
                fontSize: 20,
            })
            canvas.add(text)
        }

        document.getElementById('add-circle').onclick = () => {
            const circle = new fabric.Circle({
                left: 100,
                top: 100,
                radius: 50,
                fill: 'transparent',
                stroke: 'black',
            })
            canvas.add(circle)
        }

        document.getElementById('add-rect').onclick = () => {
            const rect = new fabric.Rect({
                left: 150,
                top: 150,
                width: 100,
                height: 50,
                fill: 'transparent',
                stroke: 'black',
            })
            canvas.add(rect)
        }

        document.getElementById('add-triangle').onclick = () => {
            const triangle = new fabric.Triangle({
                left: 200,
                top: 200,
                width: 100,
                height: 100,
                fill: 'transparent',
                stroke: 'black',
            })
            canvas.add(triangle)
        }

        document.getElementById('download').onclick = () => {
            const dataURL = canvas.toDataURL({
                format: 'png',
                quality: 1,
            })
            const link = document.createElement('a')
            link.href = dataURL
            link.download = 'edited-image.png'
            link.click()
        }

        return () => {
            canvas.dispose()
        }
    }, [id])

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
            <h1 className='text-2xl md:text-4xl font-bold text-center mb-4'>Edit Image</h1>
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl mx-2 md:mx-4 lg:mx-6">
                <div className="relative flex justify-center items-center">
                    <canvas ref={canvasRef} className="border rounded-lg w-full max-w-full" />
                </div>
                <div className="p-4 flex flex-wrap gap-4 justify-center mt-4">
                    <button id="add-text" className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-700 hover:to-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Add Caption
                    </button>
                    <button id="add-circle" className="bg-gradient-to-r from-cyan-500 to-cyan-700 hover:from-cyan-700 hover:to-cyan-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Add Circle
                    </button>
                    <button id="add-rect" className="bg-gradient-to-r from-gray-500 to-gray-700 hover:from-gray-700 hover:to-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Add Rectangle
                    </button>
                    <button id="add-triangle" className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-700 hover:to-red-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Add Triangle
                    </button>
                    <button id="download" className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-700 hover:to-green-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Download
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SingleImage
