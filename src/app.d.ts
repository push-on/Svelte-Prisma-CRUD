import type { PrismaClient } from '@prisma/client'

declare global {
	namespace App {
		// interface Error {}
		// interface PageData {}
		// interface Platform {}
	}
	var __prisma: PrismaClient

	/// <reference types="lucia-auth" />

}

export { }
