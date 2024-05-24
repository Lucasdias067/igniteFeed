import { ThumbsUp, Trash } from 'phosphor-react'
import styles from './Comment.module.css'
import { Avatar } from '../Avatar/Avatar'
import { useState } from 'react'

interface CommentProps {
    content: string;
    ondDeleteComment: (content: string) => void;
}

export function Comment({ content, ondDeleteComment }: CommentProps) {
    const [likeCount, setLikeCount] = useState(0)

    function handleDeleteComment() {
        ondDeleteComment(content)
    }

    function handleLikeComment() {
        setLikeCount((state) => {
            return state + 1;
        })
    }

    return (
        <div className={styles.comment}>
            <Avatar hasBorder={false} src="https://github.com/lucasdias067.png" alt='' />

            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.authorAndTime}>
                            <span>Lucas Dias</span>

                            <time title='12 de maio as 20:45h' dateTime='2024-05-12 20:48:35'>Cerca de 1h atras</time>

                        </div>

                        <button onClick={handleDeleteComment} title='Deletar comentario'>
                            <Trash size={24} />
                        </button>
                    </header>

                    <p>{content}</p>
                </div>

                <footer>
                    <button onClick={handleLikeComment}>
                        <ThumbsUp />
                        Aplaudir <span>{likeCount}</span>
                    </button>
                </footer>
            </div>
        </div>
    )
}