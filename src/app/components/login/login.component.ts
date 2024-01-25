import { Component, OnInit } from '@angular/core'
import { AuthService } from '../../services/auth.service'
import { NgxSpinnerService } from 'ngx-spinner'
import { Router } from '@angular/router'

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrl: './login.component.sass',
})
export class LoginComponent implements OnInit {
	email = ''
	password = ''
	linkSuccess = false

	authenticated = false

	constructor(
		private auth: AuthService,
		private spinner: NgxSpinnerService,
		private router: Router
	) {
		this.auth.currentUser.subscribe((user) => {
			if (user) {
				this.router.navigateByUrl('/workspace', { replaceUrl: true })
			}
		})
	}

	ngOnInit(): void {}

	async signUp() {
		this.spinner.show()
		const result = await this.auth.signUp(this.email, this.password)
		this.spinner.hide()

		if (!result.error) {
			this.linkSuccess = true
		} else {
			alert(result.error.message)
		}
	}

	async signIn() {
		this.spinner.show()
		const result = await this.auth.signIn(this.email, this.password)
		this.spinner.hide()

		if (!result.error) {
			this.linkSuccess = true
		} else {
			alert(result.error.message)
		}
	}
}
