import type { Actions, PageServerLoad } from './$types'
import { prisma } from '$lib/server/prisma'
import { error, fail, redirect } from '@sveltejs/kit'

export const load: PageServerLoad = async () => {
	return {
		articles: await prisma.article.findMany()
	}
}

export const actions: Actions = {
	createArticle: async ({ request, locals }) => {


		const { title, content } = Object.fromEntries(await request.formData()) as Record<
			string,
			string
		>

		try {
			await prisma.article.create({
				data: {
					title,
					content,
				}
			})
		} catch (err) {
			console.error(err)
			return fail(500, { message: 'Could not create the article.' })
		}

		return {
			status: 201
		}
	},
	deleteArticle: async ({ url, locals }) => {
		
		const id = url.searchParams.get('id')
		if (!id) {
			return fail(400, { message: 'Invalid request' })
		}

		try {
			const article = await prisma.article.findUniqueOrThrow({
				where: {
					id: Number(id)
				}
			})


			await prisma.article.delete({
				where: {
					id: Number(id)
				}
			})
		} catch (err) {
			console.error(err)
			return fail(500, {
				message: 'Something went wrong deleting your article'
			})
		}

		return {
			status: 200
		}
	}
}
