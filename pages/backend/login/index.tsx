import { Button } from 'components/Button'
import { Input } from 'components/Input'

type Props = {}

function Login(props: Props) {
  return (
    <form onSubmit={() => {}} className={'max-w-lg my-16 container space-y-8'}>
      <div className="space-y-4">
        <label htmlFor="email" className="space-y-1">
          <div className="font-semibold text-lg">Email</div>
          <input
            id="email"
            name="email"
            className={'w-full px-4 py-2 border border-gray-300 rounded'}
          />
        </label>
        <label htmlFor="email" className={'space-y-1'}>
          <div className="font-semibold text-lg">Email</div>
          <Input id="email" name="email" />
        </label>
      </div>
      <Button type="submit">Login</Button>
    </form>
  )
}

export default Login
