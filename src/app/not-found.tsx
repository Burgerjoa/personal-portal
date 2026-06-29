import Link from "next/link";
import { ArrowLeft, ReceiptText } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-12rem)] items-center px-6 py-16 sm:px-12">
      <div className="mx-auto grid w-full max-w-5xl gap-10 lg:grid-cols-[1fr_340px] lg:items-center">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">
            sold out / 404
          </p>
          <h1 className="mt-5 max-w-3xl text-5xl font-black leading-tight tracking-normal sm:text-7xl">
            주문하신 페이지가 품절됐습니다.
          </h1>
          <p className="mt-6 max-w-xl leading-8 text-muted-foreground">
            주소가 바뀌었거나 아직 준비하지 않은 메뉴입니다. 주방은 멀쩡하니
            첫 화면에서 다른 것을 골라보세요.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 border border-foreground bg-foreground px-4 py-3 text-sm font-semibold text-background transition-colors hover:bg-background hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            처음으로
          </Link>
        </div>

        <div className="border border-border bg-card p-6 font-mono text-sm">
          <div className="flex items-center justify-between border-b border-dashed border-border pb-4">
            <span className="flex items-center gap-2 font-semibold">
              <ReceiptText className="h-4 w-4" />
              BURGERJOA
            </span>
            <span className="text-muted-foreground">#0404</span>
          </div>
          <div className="overflow-hidden py-10 text-center">
            <div className="burger-stack burger-stack--large" aria-hidden="true">
              <span className="burger-mark__bun" />
              <span className="burger-mark__lettuce" />
              <span className="burger-mark__cheese" />
              <span className="burger-mark__patty" />
              <span className="burger-mark__bottom" />
            </div>
          </div>
          <div className="space-y-2 border-t border-dashed border-border pt-4 text-muted-foreground">
            <p className="flex justify-between"><span>PAGE</span><span>NOT FOUND</span></p>
            <p className="flex justify-between"><span>TOTAL</span><span>0 RESULT</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
