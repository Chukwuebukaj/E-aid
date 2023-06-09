import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Article.css";
import Modal from "../Modal/Modal";

const Article = () => {
  const [allArticles, setAllArticles] = useState<{}[]>([]);
  const [oneArticle, setOneArticle] = useState<{} | any>({});
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const allArticlesUrl = "http://localhost:5000/article/allarticles";
  const getAllArticles = async () => {
    const response = await axios.get(allArticlesUrl);
    const shuffledArr = shuffleArray(response.data.allArticles);
    if (shuffledArr.length > 6) {
      shuffledArr.length = 6;
      setAllArticles(shuffledArr);
    }
    setAllArticles(shuffledArr);
    console.log(response);
  };

  useEffect(() => {
    getAllArticles();
  }, []);

  function shuffleArray(array: {}[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const getArticle = async (id: string) => {
    const response = await axios.get(
      `http://localhost:5000/article/getarticle/${id}`
    );
    console.log(response);
    if (response.data.getArticle) {
      setOneArticle(response.data.getArticle);
      openModal();
    }
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="article-card">
      {/* <div>calendar</div> */}
      <h3 className="article-card-h3">Recommended Articles</h3>

      <div className="allCards">
        {allArticles.map((article: any, index: number) => (
          <div
            className="article-card1"
            key={index}
            onClick={() => getArticle(article.articleId)}
          >
            <div className="article-icon1">
              <img className="article-img" src={article.headerImage} alt="" />
            </div>
            <div className="article-content">
              <h3 className="article-h3">{article.articleTitle}</h3>
              <p className="article-small-p"> 10 mins read</p>
              {/* <p className="article-large-p">{article.articleBody}</p> */}
            </div>
          </div>
        ))}
      </div>
      {modalOpen && (
        <Modal
          children={
            <div>
              <img src={oneArticle.headerImage} alt="" />
              <h1>{oneArticle.articleTitle}</h1>
              <p>{oneArticle.articleBody}</p>
            </div>
          }
          handleCloseModal={closeModal}
          modalContainer="articleDisplay"
          modalBackground="articleModal"
          modalBtn="modal-button articleBtn"
        />
      )}
    </div>
  );
};

export default Article;
