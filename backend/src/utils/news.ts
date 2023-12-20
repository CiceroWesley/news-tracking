import { AxiosResponse } from "axios";
import axiosInstance from "./axios";
import { news, requestNews } from "../types/types";
import * as cheerio from 'cheerio';

class News {

    static async requestNews(data : requestNews) : Promise<AxiosResponse>{
        const {q, hl, gl} = data;
        const news = await axiosInstance.get(``, {headers: {"User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36"}, params: { q: encodeURI(q), tbm: "nws", hl, gl}});
        return news;
    }

    static selectArticles(newsData : AxiosResponse) : cheerio.Cheerio<cheerio.Element>{
        const $ = cheerio.load(newsData.data);
    
        // selecting articles by classname
        const $articles = $('article.IFHyqb');

        return $articles;
    }

    static mountStructureNews($articlesData : cheerio.Cheerio<cheerio.Element>) : news[] {
        let articles : news[] = [];
        // changing structure
        $articlesData.each((index, article) => {
        const element : news = {
            title : ((((article.children[0] as unknown) as Element).children[1].children[0].children[1].children[0] as unknown) as Text).data,
            link : ((((article.children[0] as unknown) as Element).children[1].children[0].children[1] as unknown) as cheerio.Element).attribs.href,
            time : ((((article.children[1] as unknown) as Element).children[0].children[0] as unknown) as Text).data
        }
        articles.push(element);
        })    
        return articles;
    }

}

export default News;