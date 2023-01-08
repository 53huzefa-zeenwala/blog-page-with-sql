// import axios from "axios";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Menu = ({ category, postId }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/related/?category=${category}&id=${postId}`);
                setPosts(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        if (category && postId) {
            fetchData();
        }
    }, [category, postId]);
    // const posts = [
    //     {
    //         id: 1,
    //         title: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil, ut?",
    //         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla ab mollitia fuga! Atque ad dignissimos repellendus est laborum incidunt tempora provident qui!",
    //         image: "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    //     },
    //     {
    //         id: 2,
    //         title: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil, ut?",
    //         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla ab mollitia fuga! Atque ad dignissimos repellendus est laborum incidunt tempora provident qui!",
    //         image: "https://images.pexels.com/photos/13009437/pexels-photo-13009437.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    //     },
    //     {
    //         id: 3,
    //         title: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil, ut?",
    //         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla ab mollitia fuga! Atque ad dignissimos repellendus est laborum incidunt tempora provident qui!",
    //         image: "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    //     },
    // ]
    return (
        <div className="menu">
            <h1>Other posts you may like</h1>
            {posts.map((post) => (
                <div className="post" key={post.id}>
                    <img src={`../upload/${post?.image}`} alt="" />
                    <h2>{post.title}</h2>
                    <button>
                        <Link to={`/post/${post?.id}`}>
                            Read More
                        </Link>
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Menu;