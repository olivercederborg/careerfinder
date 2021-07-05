import { HTMLProps, useEffect, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import axios from 'axios'
import { Alert } from 'components/Alert'
import { Layout } from 'components/backend/Layout'
import { Button } from 'components/Button'
import { Input } from 'components/Input'
import { TextArea } from 'components/TextArea'

type FormValues = {
  url: string
  name: string
  description: string
  price: string
  avatarUrl: string
  imageUrl: string
  author: string
  locale: string
}

interface Props extends HTMLProps<HTMLFormElement> {}

export function CourseForm(props: Props) {
  const imageRef = useRef<HTMLImageElement>()
  const [naturalWidth, setNaturalWidth] = useState<number>()
  const [naturalHeight, setNaturalHeight] = useState<number>()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    clearErrors,
    setValue,
  } = useForm<FormValues>({
    shouldUnregister: true,
  })

  const name = watch('name', '')
  const url = watch('url', '')
  const imageUrl = watch('imageUrl', '')

  useEffect(() => {
    const scrape = async () => {
      const { data, status } = await axios.post('/api/course/scrape', {
        url: url,
      })

      if (status >= 400) {
        setError('url', {
          type: 'manual',
          message: `Something went wrong. Check the URL address and it's contents to make sure it's a course page.`,
        })
      } else {
        clearErrors('url')

        setValue('name', data.title)
        setValue('description', data.description)
        setValue('imageUrl', data.imageUrl)
        setValue('author', data.author)
        setValue('locale', data.locale)
      }
    }

    scrape()
  }, [url])

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log({ data })
  }

  return (
    <Layout createUrl={'/backend/course/create'}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-start space-y-4"
      >
        {/* <input
          defaultValue={course.data?.id}
          type="hidden"
          {...register('id')}
        /> */}

        <label htmlFor="url" className="flex flex-col w-full space-y-2">
          <div className="font-semibold">URL</div>

          <Input type="text" {...register('url')} />

          {errors.url ? (
            <Alert variant="error">{errors.url.message}</Alert>
          ) : null}
        </label>

        <label htmlFor="name" className="flex flex-col w-full space-y-2">
          <div className="font-semibold">Name</div>

          <Input type="text" {...register('name')} />

          {errors.name ? (
            <Alert variant="error">{errors.name.message}</Alert>
          ) : null}
        </label>

        <label htmlFor="description" className="flex flex-col w-full space-y-2">
          <div className="font-semibold">Description</div>

          <TextArea {...register('description')}></TextArea>

          {errors.description ? (
            <Alert variant="error">{errors.description.message}</Alert>
          ) : null}
        </label>

        <label htmlFor="price" className="flex flex-col w-full space-y-2">
          <div className="font-semibold">Price</div>

          <Input type="text" {...register('price')} />

          {errors.price ? (
            <Alert variant="error">{errors.price.message}</Alert>
          ) : null}
        </label>

        <label htmlFor="imageUrl" className="flex flex-col w-full space-y-2">
          <div className="font-semibold">Image URL</div>

          <Input type="text" {...register('imageUrl')} />

          {imageUrl ? (
            <div className="flex items-center space-x-2">
              <img
                ref={(ref) => (imageRef.current = ref)}
                src={imageUrl}
                alt={name}
                className={'max-w-sm w-full rounded'}
                onLoad={(event) => {
                  setNaturalWidth(event.currentTarget.naturalWidth)
                  setNaturalHeight(event.currentTarget.naturalHeight)
                }}
              />
              <div className="flex flex-col">
                <p>Width: {naturalWidth}</p>
                <p>Height: {naturalHeight}</p>
              </div>
            </div>
          ) : null}

          {errors.imageUrl ? (
            <Alert variant="error">{errors.imageUrl.message}</Alert>
          ) : null}
        </label>

        <label htmlFor="author" className="flex flex-col w-full space-y-2">
          <div className="font-semibold">Author</div>

          <Input type="text" {...register('author')} />

          {errors.author ? (
            <Alert variant="error">{errors.author.message}</Alert>
          ) : null}
        </label>

        <label htmlFor="locale" className="flex flex-col w-full space-y-2">
          <div className="font-semibold">Locale</div>

          <Input type="text" {...register('locale')} />

          {errors.locale ? (
            <Alert variant="error">{errors.locale.message}</Alert>
          ) : null}
        </label>

        <Button type="submit">Submit</Button>
      </form>
    </Layout>
  )
}

export default CourseForm
