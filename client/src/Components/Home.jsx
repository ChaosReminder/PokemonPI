import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPokemons, getTypes } from "../Redux/actions";
import Cards from "./Cards";
import Filters from "./Filters";
import Loader from "./Loader";
import Pagination from "./Pagination";
import Searchbar from "./Searchbar";
import "./Styles/Home.css";

const Home = () => {
  const pokes = useSelector((state) => state.allPokes);
  const dispatch = useDispatch();
  /*<--Pagination-->*/
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [pokesPerPage, setPokesPerPage] = useState(12);
  const indexOfLastPoke = currentPage * pokesPerPage;
  const indexOfFirstPoke = indexOfLastPoke - pokesPerPage;
  const currentPokes = pokes?.slice(indexOfFirstPoke, indexOfLastPoke);
  const PAGINATION = (pageNum) => {
    setCurrentPage(pageNum);
  };
  /*<--Pagination-->*/
  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTypes());
  }, [dispatch]);
  if (pokes.length > 0) {
    return (
      <div id="Primary">
        I'm home
        <nav className="Navi">
          <Searchbar />
          <Filters currentPage={currentPage} setCurrentPage={setCurrentPage} />
          <button id="butCreatHome">
            <Link to={"/create"}>CREATE POKE</Link>
          </button>
        </nav>
        <div id="cardContainer">
          {pokes &&
            currentPokes?.map((pk) => {
              return (
                <Link to={"/home/" + pk.id}>
                  <Cards
                    id={pk.id}
                    name={pk.name}
                    image={pk.image}
                    types={pk.types}
                    key={pk.id}
                  />
                </Link>
              );
            })}
        </div>
        <Pagination
          pokesPerPage={pokesPerPage}
          pokes={pokes.length}
          pagination={PAGINATION}
        />
      </div>
    );
  } else {
    return <Loader />;
  }
};

export default Home;
