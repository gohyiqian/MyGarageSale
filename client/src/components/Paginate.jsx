import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Paginate = ({
  pages,
  page,
  keyword = "",
  category = "",
  isAdmin = false,
}) => {
  //  fix keyword

  // console.log(keyword);
  if (keyword) {
    keyword = keyword.split("?keyword=")[1].split("&")[0];
    // console.log(keyword);
  }
  // console.log(category);
  if (category) {
    category = category.split("?category=")[1].split("&")[0];
    // console.log(category);
  }

  return (
    pages > 1 && (
      <Pagination className="pagination justify-content-center">
        {/* <Pagination.First />
        <Pagination.Prev /> */}

        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={
              isAdmin
                ? `/admin/productlist/?keyword=${keyword}&page=${x + 1}`
                : category
                ? `/${category}/?keyword=${category}&page=${x + 1}`
                : `/?keyword=${keyword}&page=${x + 1}`
            }
          >
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
        {/* <Pagination.Next />
        <Pagination.Last /> */}
      </Pagination>
    )
  );
};

export default Paginate;
