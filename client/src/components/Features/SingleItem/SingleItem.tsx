import styled from 'styled-components';
import { SingleItemType } from './type'

const SingleItem = ({ src, title, date, author, isMain, onClick }: SingleItemType) => {
	return (
		<SingleItemDiv isMain={isMain} onClick={onClick}>
			<ImgDiv isMain={isMain}>
				<SingleItemImg src={src} isMain={isMain} />
			</ImgDiv>
			<SingleItemMeta isMain={isMain}>
				<h1>{title}</h1>
				<div>
					<p>{date}</p>
					<p>{author}</p>
				</div>
			</SingleItemMeta>
		</SingleItemDiv>
	)
}

export default SingleItem;


// Styled-Component 
const SingleItemDiv = styled.div<SingleItemType>`
		width: ${(props) => props.isMain ? '17rem' : '20rem'};
		display: flex;
		flex-direction: column;


`

const ImgDiv = styled.div<SingleItemType>`
			height: ${(props) => props.isMain ? '15rem' : '15rem'};
			overflow: hidden;
			border-radius: 1rem;
`

const SingleItemImg = styled.img<SingleItemType>`
		width: 100%;
		height: 100%;
		object-fit: cover;

		transition: all 0.2s linear;

		&:hover {
			transform: scale(1.1);
		}
` 

const SingleItemMeta = styled.div<SingleItemType>`
		width: 100%;
		height: 10%;
		padding: 0.3rem 0.7rem 0rem 0.7rem;
		color: white;
		& > h1 {
			font-size: ${(props) => props.isMain ? '1rem' : '1.3rem'};
			font-weight: 600;
		}
		& > div {
			width: 100%;
			display: flex;
			justify-content: space-between;
		}
` 