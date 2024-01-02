import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Label,
  PasswordInput,
} from "@spec-team/ui";

import { useSignUpHooks } from "./useSignUpHooks";

export const UserAuthForm = () => {
  const { form, onSubmit, isLoading } = useSignUpHooks();
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className=" flex flex-col space-y-8 ">
          <Label className="sr-only" htmlFor="email">
            Email
          </Label>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className=" flex flex-col">
                <FormLabel className=" self-start">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="メール"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className=" flex flex-col">
                <FormLabel className=" self-start">Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="パスワード"
                    type="password"
                    autoCapitalize="none"
                    autoComplete="current-password"
                    autoCorrect="off"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rePassword"
            render={({ field }) => (
              <FormItem className=" flex flex-col">
                <FormLabel className=" self-start">Password Re-Enter</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="パスワード"
                    type="password"
                    autoCapitalize="none"
                    autoComplete="current-password"
                    autoCorrect="off"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <p className=" text-muted-foreground py-4 text-center text-sm">
            「アカウント登録」することで
            <br />
            <a
              href="/terms"
              className="text-primary underline underline-offset-4"
            >
              サービス利用規約
            </a>
            、
            <a
              href="/privacy"
              className="text-primary underline underline-offset-4"
            >
              個人情報保護ポリシー
            </a>
            <br />
            に同意します。
          </p>
          <Button
            type="submit"
            disabled={isLoading}
            className=" h-8 rounded bg-red-600"
          >
            {isLoading ? "Loading..." : "会員登録"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
