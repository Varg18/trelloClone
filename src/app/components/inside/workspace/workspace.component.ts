import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from '../../../services/auth.service'
import { DataService } from '../../../services/data.service'

@Component({
	selector: 'app-workspace',
	templateUrl: './workspace.component.html',
	styleUrl: './workspace.component.sass',
})
export class WorkspaceComponent implements OnInit {
	boards: any[] = []
	user = this.auth.currentUser

	constructor(
		private auth: AuthService,
		private dataService: DataService,
		private router: Router
	) {}

	async ngOnInit() {
		this.boards = await this.dataService.getBoards()
	}

	async startBoard() {
		await this.dataService.startBoard()
		this.boards = await this.dataService.getBoards()

		if (this.boards.length > 0) {
			const newBoard = this.boards.pop()
			if (newBoard.boards) {
				this.router.navigateByUrl(`/workspace/${newBoard.boards.id}`)
			}
		}
	}

	signOut() {
		this.auth.logout()
	}
}
