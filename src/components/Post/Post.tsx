import { format, formatDistanceToNow } from 'date-fns'
import { FormEvent, ChangeEvent, useState, InvalidEvent } from 'react'

import { Avatar } from '../Avatar/Avatar'
import { Comment } from '../Comment/Comment'

import styles from './Post.module.css'
import { ptBR } from 'date-fns/locale'

interface Author {
    name: string;
    role: string;
    avatarUrl: string;
}

interface  Content {
    type: 'paragraph' | 'link',
    content: string;
}

export interface PostType {
    id: number,
    author: Author,
    publishedAt: Date;
    content: Content[],
}

interface PostPorps {
   post: PostType,
}

export function Post({ post }: PostPorps) {
    const [comments, setComments] = useState([
        'Post muito bacana, hein!?'
    ]);

    const [newCommentText, setNewCommentText] = useState('');

    const publushedDateFormatted = format(post.publishedAt, "dd 'de' LLLL 'as' HH:mm'h'", {
        locale: ptBR,
    })

    const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
        locale: ptBR,
        addSuffix: true,
    })

    function handleCreateNewComment(event: FormEvent) {
        event.preventDefault();
        setComments([...comments, newCommentText]);
        setNewCommentText('')
    }

    function handlewNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('')
        setNewCommentText(event.target.value)
    }

    function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('Esse campo é obrigatório!')
    }

    function deleteComment(commentToDelete: string) {
        const commentsWhitoutDeletedOne = comments.filter(comment => {
            return comment !== commentToDelete
        })

        setComments(commentsWhitoutDeletedOne);
    }

    const isNewCommentEmpty = newCommentText.length === 0;

    return (
        <article className={styles.post}>
            <header >
                <div className={styles.author}>
                    <Avatar src={post.author.avatarUrl} />
                    <div className={styles.authorInfo}>
                        <strong>{post.author.name}</strong>
                        <span>{post.author.role}</span>
                    </div>
                </div>

                <time title={publushedDateFormatted} dateTime={post.publishedAt.toISOString()}>
                    {publishedDateRelativeToNow}
                </time>
            </header>

            <div className={styles.content}>
                {post.content.map(line => {
                    if (line.type === 'paragraph') {
                        return <p key={line.content}> {line.content}</p>
                    } else if (line.type === 'link') {
                        return <p key={line.content}><a href="">{line.content}</a> </p>
                    }
                })}
            </div>

            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <textarea
                    name='comment'
                    placeholder='Deixe um comentario'
                    value={newCommentText}
                    onChange={handlewNewCommentChange}
                    onInvalid={handleNewCommentInvalid}
                    required
                />

                <footer>
                    <button type='submit' disabled={isNewCommentEmpty}>
                        Publicar
                    </button>
                </footer>
            </form>

            <div className={styles.commentList}>
                {comments.map(comment => {
                    return (
                        <Comment
                            key={comment}
                            content={comment}
                            ondDeleteComment={deleteComment}
                        />
                    )
                })}
            </div>
        </article>
    )
}