// import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import axios from 'axios'
import styles from '../styles/Home.module.css'

export default function ImagePage() {
  const [search, setSearch] = useState([]);
  const [ids, setIds] = useState([]);
  const [images, setImages] = useState([]);
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    getSearches();
  },[])

  useEffect(() => {
    getTweetInfo(ids);
  },[ids])

  //fetch the tweets by hashtag keyword and check if there's media attachment,if yes, push the id to an array and pass it to getTweetInfo function
  async function getSearches() {
    await axios.get(`tweets/search/recent?query=mindfulTokenPFP&expansions=attachments.media_keys&media.fields=duration_ms,height,media_key,preview_image_url,public_metrics,type,url,width,alt_text`, {
      headers: {
        'Authorization': `Bearer ${process.env.TWITTER_BTOKEN}`,
        "Access-Control-Allow-Origin": "*"
      }
    })
    .then(res => {
      const posts = res.data.data;
      const ids = [];
      posts.map(p => {
        if(p.attachments) {
          ids.push(p.id)
        }
      })
      setIds(ids)
    }).catch(err => {
      console.error(err)
    })
  }

  //get the tweets by ids passed from searches
  async function getTweetInfo(ids) {
    await axios.get(`tweets?ids=${ids}&expansions=attachments.media_keys&media.fields=duration_ms,height,media_key,preview_image_url,public_metrics,type,url,width,alt_text&tweet.fields=attachments,author_id,context_annotations,created_at,entities,geo,id,in_reply_to_user_id,lang,possibly_sensitive,public_metrics,referenced_tweets,source,text,withheld`, {
      headers: {
        'Authorization': `Bearer ${process.env.TWITTER_BTOKEN}`,
        "Access-Control-Allow-Origin": "*"
      }
    })
    .then(async res => {
      const data = res.data.data;
      const mediaData = res.data.includes.media;
      const tweets = [];
      const images = [];
      await mediaData.map(x => {
        const url = x.url;
        const description = x.alt_text;
        let image = {
          url,
          description
        }
        images.push(image);
      });
      setImages(images)

      await data.map(x => {
        //each tweet's hashtags is an object, convert it to string
        const hashtags = [];
        x.entities.hashtags.map(hashtag => {
            hashtags.push(hashtag.tag) 
        })
        tweets.push(hashtags)
      })
      setTweets(tweets)
    }).catch(err => {
      console.error(err)
    })
  }
  return (
    <div>
      <h1>Mindful Token Event</h1>
      {
        tweets.map(tweet => {
          <div>hashtag: {tweet}</div>
        })
      }
      <h2>hashtag: {tweets[0]}</h2>
      {/* <img src={images[0].url} alt="" style={{height:'20rem', width: '20rem'}}/>
      <h2>hashtag: {tweets[1]}</h2>
      <img src={images[1].url} alt="" style={{height:'20rem', width: '20rem'}}/> */}
      
    </div>
  )
}
