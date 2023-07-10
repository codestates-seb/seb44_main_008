import { styled } from 'styled-components';

// const Pagenation = ({ total, limit, page, setPage }) => {
//   const numPages = Math.ceil(total / limit);
//   return (
//     <>
//       <PaginationContainer>
//         <StyledButton onClick={() => setPage(page - 1)} disabled={page === 1}>
//           &lt;
//         </StyledButton>
//         {Array(numPages)
//           .map((_, i) => (
//             <StyledButton
//               key={i + 1}
//               onClick={() => setPage(i + 1)}
//               aria-current={page === i + 1 ? 'page' : null}
//             >
//               {i + 1}
//             </StyledButton>
//           ))}
//         <StyledButton
//           onClick={() => setPage(page + 1)}
//           disabled={page === numPages}
//         >
//           &gt;
//         </StyledButton>
//       </PaginationContainer>
//     </>
//   );
// };
import React from 'react';

interface PaginationProps {
  total: number;
  limit: number;
  page: number;
  setPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  total,
  limit,
  page,
  setPage,
}) => {
  const numPages = Math.ceil(total / limit);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= numPages) {
      setPage(newPage);
    }
  };

  return (
    <PaginationContainer>
      <StyledButton
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
      >
        &lt;
      </StyledButton>
      {Array(numPages)
        .fill(null)
        .map((_, i) => {
          const pageNumber = i + 1;
          return (
            <StyledButton
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              aria-current={page === pageNumber ? 'page' : undefined}
            >
              {pageNumber}
            </StyledButton>
          );
        })}
      <StyledButton
        onClick={() => handlePageChange(page + 1)}
        disabled={page === numPages}
      >
        &gt;
      </StyledButton>
    </PaginationContainer>
  );
};

export default Pagination;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 4rem;
`;
const StyledButton = styled.button`
  width: 1.8rem;
  height: 1.8rem;
  background-color: var(--ghost-color);
  border-radius: 4px;
  font-size: 0.9rem;
  color: var(--white-color);
  &:hover {
    opacity: 0.7;
  }
`;
// export default Pagenation;
