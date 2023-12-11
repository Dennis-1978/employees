import { Component } from "react";

import "./employees-add-form.css";

/**
 * Компонент добавляет нового сотрудника
 */
class EmployeesAddForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: "",
			salary: "",
		};
	}

	onValueChange = event => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	onSubmit = event => {
		event.preventDefault();

		const { name, salary } = this.state;

		if (name.length > 3 && salary) {
			this.props.onAdd(name, salary);
			this.setState({
				name: "",
				salary: "",
			});
		}
		return;
	};

	render() {
		const { name, salary } = this.state;

		return (
			<div className='app-add-form'>
				<h3>Добавьте нового сотрудника</h3>
				<form
					onSubmit={this.onSubmit}
					className='add-form d-flex'>
					<input
						type='text'
						name='name'
						className='form-control new-post-label'
						placeholder='Как его зовут?'
						onChange={this.onValueChange}
						value={name}
					/>
					<input
						type='number'
						name='salary'
						className='form-control new-post-label'
						placeholder='З/П в $?'
						onChange={this.onValueChange}
						value={salary}
					/>
					<button
						type='submit'
						className='btn btn-outline-light'>
						Добавить
					</button>
				</form>
			</div>
		);
	}
}

export default EmployeesAddForm;
