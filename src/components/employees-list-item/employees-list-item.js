import cn from "classnames";

import "./employees-list-items.css";

/**
 * Компонент элемент списка сотрудников
 * @param props {Object}
 * @returns {React.JSX.Element}
 */
const EmployeesListItem = props => {
	const {
		name,
		salary,
		onDelete,
		onToggleProp,
		onUpdateValue,
		increase,
		like,
	} = props;

	const classNamesLi = cn({
		"list-group-item": true,
		"d-flex": true,
		"justify-content-between": true,
		increase,
		like,
	});

	return (
		<li className={classNamesLi}>
			<span
				data-toggle='like'
				onClick={onToggleProp}
				className='list-group-item-label'>
				{name}
			</span>
			<input
				type='text'
				className='list-group-item-input'
				defaultValue={salary + "$"}
				onChange={onUpdateValue}
			/>
			<div className='d-flex justify-content-center align-items-center'>
				<button
					onClick={onToggleProp}
					data-toggle='increase'
					type='button'
					className='btn-cookie btn-sm'>
					<i className='fas fa-cookie'></i>
				</button>

				<button
					type='button'
					className='btn-trash btn-sm'
					onClick={onDelete}>
					<i className='fas fa-trash'></i>
				</button>
				<i className='fas fa-star'></i>
			</div>
		</li>
	);
};

export default EmployeesListItem;
