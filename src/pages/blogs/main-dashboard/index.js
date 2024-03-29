import { useEffect, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { getArticles } from "../../../store/slices/blogs/slices"
import { getLikedArticles } from "../../../store/slices/blogs/myLikedArticles/slices"
import RenderMyBlogCards from "./listMyArticles"
import RenderLikedBlogCards from "../blogs-components/userLikedBlog"
import Pagination from "../blogs-components/pagination"
import Footer from "../../../components/footer"
import { useNavigate } from "react-router-dom"

export default function DashboardPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { username } = useSelector(state => state.auth)

  const { filteredArticles, likedArticles, currentLikedPages } = useSelector(state => ({
    filteredArticles: state.blogs.filteredArticles,
    likedArticles: state.liked.likedArticles,
    currentLikedPages: state.liked.currentPage,
  }))

  const onLikedArticles = useCallback(
    type => {
      dispatch(getLikedArticles({ page: type === "prev" ? currentLikedPages - 1 : currentLikedPages + 1 }))
    },
    [dispatch, currentLikedPages]
  )

  const writeIcon = <FontAwesomeIcon icon={faPenToSquare} />

  useEffect(() => {
    dispatch(getLikedArticles({ page: 1 }))
    dispatch(getArticles({ id_cat: "", page: 1, sort: "ASC" }))
  }, [dispatch])

  return (
    <div className="flex flex-col flex-wrap gap-5 pt-10 w-full mt-10">
      <div className="text-bold text-[40pt] text-center">Hello, {username}!</div>
      <div className="text-center text-[18pt]">This is your dashboard page.</div>

      <div className="flex gap-5 pt-10 w-full mt-2">
        {/* Sisi kiri */}
        <div className="flex flex-col gap-5 justify-between py-20 w-1/3 bg-slate-200 rounded-lg">
          <div className="text-2xl font-bold place-self-center flex-wrap">My Favorite Blogs</div>
          <div className="flex justify-between place-self-center mt-5 -mb-5">
            <Pagination
              onChangePagination={onLikedArticles}
              disabledPrev={currentLikedPages === 1}
              disabledNext={likedArticles.length === 0}
            />
          </div>

          <div className="grid flex-grow card w-fit h-[460px] carousel carousel-vertical rounded-box place-items-start flex-wrap gap-5 justify-between my-5 mx-5">
            {likedArticles.length === 0 ? (
              <div className="h-full w-full text-center">
                <a className="text-[30px] w-full" href="/">
                  Oops, you haven't liked any articles. Your favorite articles will appear here after you like an or some articles.
                </a>
              </div>
            ) : (
              <RenderLikedBlogCards likedArticles={likedArticles} />
            )}
          </div>
        </div>

        {/* Sisi kanan */}
        <div className="flex flex-col gap-5 justify-between bg-slate-200 rounded-lg py-20 w-2/3">
          <div className="font-bold text-2xl text-center">My Articles Blogs </div>
          {filteredArticles.length === 0 ? (
            <div className="flex flex-col w-full h-1/3 px-10">
              <div
                className="btn text-black bg-slate-200 btn-lg justify-center place-self-center btn-neutral hover:text-white hover:scale-110 cursor-pointer"
                onClick={() => {
                  navigate("/post-blog")
                }}
              >
                <div>{writeIcon} Ready to write a blog?</div>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto px-7">
              <a
                onClick={() => {
                  navigate("/post-blog")
                }}
                className="text-[14pt] btn btn-neutral hover:text-white hover:scale-110 cursor-pointer"
              >
                <div className="justify-center place-self-center">{writeIcon} I'm ready to write a blog! </div>
              </a>
              <table className="table">
                <thead>
                  <tr>
                    <th>Thumbnail</th>
                    <th>Title</th>
                    <th>Content</th>
                    <th>Category</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <RenderMyBlogCards filteredArticles={filteredArticles} />
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}
