import { Header } from "./components/Header/Header";
import { Post, PostType } from './components/Post/Post'
import { Sidebar } from "./components/Sidebar/Sidebar";

import styles from "./App.module.css"

import './global.css'

const posts: PostType[] = [
  {
    id: 1,
    author: {
      avatarUrl: "https://github.com/lucasdias067.png",
      name: "Lucas Dias",
      role: "Web Developer"
    },
    content: [
      { type: 'paragraph', content: 'Fala galeraa 👋' },
      { type: 'paragraph', content: 'Acabei de subir mis um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀' },
      { type: 'link', content: 'jane.design / doctorcare' },
    ],
    publishedAt: new Date('2024-05-15 20:00:00'),
  }
];

export function App() {
  return (
    <>
      <Header />

      <div className={styles.wrapper}>

        <Sidebar />

        <main>
          {posts.map(post => {
            return (
              <Post
                key={post.id}
                post={post}
              />
            )
          })
          }
        </main>

      </div>
    </>
  )
}