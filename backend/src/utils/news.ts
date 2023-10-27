import { AxiosResponse } from "axios";
import axiosInstance from "./axios";
import { news, requestNews } from "../types/types";
import * as cheerio from 'cheerio';

class News {

    static async requestNews(data : requestNews) : Promise<AxiosResponse>{
        const {q, hl, gl} = data;
        const news = await axiosInstance.get(`https://news.google.com/search?q=${q}&hl=${hl}&gl=${gl}&ceid=BR%3Apt-419`);
        return news;
    }

    static selectArticles(newsData : AxiosResponse) : cheerio.Cheerio<cheerio.Element>{
        const $ = cheerio.load(newsData.data);
    
        // selecting articles by classname
        const $articles = $('.DY5T1d.RZIKme');

        return $articles;
    }

    static mountStructureNews($articlesData : cheerio.Cheerio<cheerio.Element>) : news[] {
        let articles : news[] = [];
        // changing structure
        // title is son of <a> tag
        // time is in parent of article in next position, son 0, son 1, son 0 in data
        $articlesData.each((index, article) => {
        const element : news = {
            title : ((article.children[0] as unknown) as Text).data,
            link : article.attribs.href,
            time : ((((article.parent?.next as unknown) as Element).children[0].children[1].children[0] as unknown) as Text).data
        }
        articles.push(element);
        })    
        return articles;
    }

}

export default News;