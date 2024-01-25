import { Injectable } from '@angular/core'
import { SupabaseClient, User, createClient } from '@supabase/supabase-js'
import { environment } from '../../environments/environment.development'
import { BehaviorSubject } from 'rxjs'
import { Router } from '@angular/router'

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private supabase: SupabaseClient
	private _currentUser: BehaviorSubject<boolean | User | any> =
		new BehaviorSubject(null)

	constructor(private router: Router) {
		this.supabase = createClient(
			environment.supabaseUrl,
			environment.supabaseKey
		)

		const user = this.supabase.auth.getUser()

		if (user) {
			this._currentUser.next(user)
		} else {
			this._currentUser.next(false)
		}

		this.supabase.auth.onAuthStateChange((event, session) => {
			if (event === 'SIGNED_IN') {
				this._currentUser.next(session?.user)
			} else {
				this._currentUser.next(false)
				this.router.navigateByUrl('/', { replaceUrl: true })
			}
		})
	}

	signUp(email: string, password: string) {
		return this.supabase.auth.signUp({
			email,
			password,
		})
	}

	signIn(email: string, password: string) {
		return this.supabase.auth.signInWithPassword({
			email,
			password,
		})
	}

	logout() {
		this.supabase.auth.signOut({ scope: 'local' })
	}

	get currentUser() {
		return this._currentUser.asObservable()
	}
}
