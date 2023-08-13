import { getNFTTypeString } from "../../../utils/interact/utility"
const { Readable } = require('stream')
const axios = require('axios')
const FormData = require('form-data')

const pinFileToIPFS = async (imgData: any) => {
  const bf = Buffer.from(imgData.image.split('base64,')[1], 'base64')
  const stream = Readable.from(bf)
  const data = new FormData()
  data.append('file', stream, {
    filepath: `SBC-${imgData.eventID}-${imgData.roundLevel}-${imgData.nftType}.png`,
  })

  try {
    const res = await axios.post(
      'https://api.pinata.cloud/pinning/pinFileToIPFS',
      data,
      {
        headers: {
          pinata_api_key: `${process.env.PINATA_API_KEY}`,
          pinata_secret_api_key: `${process.env.PINATA_SECRET_API_KEY}`,
        },
      }
    )

    console.log("pinata file url: ", res.data);

    return {
      isSuccess: true,
      data: res.data,
    }
  } catch (error) {
    console.error(error, 'Error')
    return {
      isSuccess: false,
      data: null,
    }
  }
}

const pinJSONToIPFS = async (jsonData: Object) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`

  try {
    const res = await axios.post(url, jsonData, {
      headers: {
        pinata_api_key: `${process.env.PINATA_API_KEY}`,
        pinata_secret_api_key: `${process.env.PINATA_SECRET_API_KEY}`,
      },
    })

    return {
      isSuccess: true,
      data: res.data,
    }
  } catch (error) {
    console.error(error, 'Error')
    return {
      isSuccess: false,
      data: null,
    }
  }
}

function constructJSON(data: any, imageHash: string) {
  const json_data = {
    pinataMetadata: {
      name: `SBC-${data?.eventID}-${data.roundLevel}-${data.nftType}.json`,
    },
    pinataContent: {
      name: `Squid Bet NFT #${data.eventID}-${data.roundLevel}-${data.nftType}`,
      description: 'Squid Bet Winner NFT',
      external_url: `ipfs://${imageHash}`,
      image: `ipfs://${imageHash}`,
      attributes: [
        {
          "trait_type": "event id",
          "value": `Squid Bet #${data.eventID}`,
        },
        {
          "trait_type": "round id",
          "value": data.roundLevel > 0 ? `Round ${data.roundLevel}` : `Final Winner`,
        },
        {
          "trait_type": "nft type",
          "value": getNFTTypeString(data.nftType),
        }
      ],
    },
  }

  return json_data
}

export const uploadNFT = async (req: any, res: any) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  try {
    const data = req.body
    let result = await pinFileToIPFS(data)

    if (result.isSuccess) {
      const imageHash = result.data.IpfsHash
      const metadata = constructJSON(data, imageHash)
      result = await pinJSONToIPFS(metadata)

      if (result.isSuccess) {
        res.status(200).json({
          isSuccess: true,
          hash: `ipfs://${result.data.IpfsHash}`,
        })
      } else {
        res.status(500).json({
          isSuccess: false,
        })
      }
    } else {
      res.status(500).json({
        isSuccess: false,
      })
    }
  } catch {
    res.status(500).json({
      isSuccess: false,
    })
  }
}

export default uploadNFT;
