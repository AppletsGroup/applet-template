import { useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector, post } from 'applet-store'
import { useReachBottom } from 'use-reach-bottom'
import { useApplet } from 'applet-shell'
const { setCurrentPage, loadPosts, setSchemas, setAppletId } = post

export default function PostsPage() {
  const listRef = useRef(null)
  const { hasNext, posts, currentPage, loadingPosts, loadedOnce } = useAppSelector((state) => state.post)
  const dispatch = useAppDispatch()

  const applet = useApplet()
  const appletId = applet?.appletInfo?.id ?? 0

  useEffect(() => {
    const initData = (): void => {
      dispatch(setSchemas(['YOUR APPLET POST SCHEMAS']))
      dispatch(setAppletId(appletId))
      void dispatch(loadPosts())
    }
    if (appletId > 0) initData()
  }, [appletId, dispatch])

  useReachBottom(listRef, () => {
    if (loadedOnce && hasNext && !loadingPosts) {
      dispatch(setCurrentPage(currentPage + 1))
      void dispatch(loadPosts())
    }
  })

  return (
    <div className="h-full">
      <div className="container mx-auto py-5">
        <h2 className="text-3xl font-extrabold">Posts</h2>
        <div className="mt-8 grid gap-8 lg:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1">
          {posts.map((post) => (
            <div key={post.id}>{post.id}</div>
          ))}
        </div>
      </div>
    </div>
  )
}
