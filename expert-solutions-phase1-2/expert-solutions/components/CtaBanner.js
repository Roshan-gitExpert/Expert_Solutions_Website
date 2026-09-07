import ClickToCallGroup from './ClickToCallGroup';

export default function CtaBanner({
  title = 'Get a Free Review of Your Business Energy Costs',
  subtitle = 'It takes about two minutes online, or speak to a specialist right now by phone.',
}) {
  return (
    <section className="bg-navy-900">
      <div className="mx-auto max-w-5xl px-4 py-14 text-center sm:px-6 lg:px-8">
        <h2 className="text-2xl font-extrabold text-white sm:text-3xl">{title}</h2>
        <p className="mx-auto mt-3 max-w-2xl text-navy-200">{subtitle}</p>
        <div className="mt-8 flex flex-col items-center gap-4">
          <a
            href="#lead-form"
            className="w-full max-w-xs rounded-lg bg-amber-500 px-6 py-4 text-center text-base font-bold text-navy-950 shadow-card transition hover:bg-amber-400 sm:w-auto"
          >
            GET MY FREE ENERGY REVIEW
          </a>
          <ClickToCallGroup location="cta-banner" />
        </div>
      </div>
    </section>
  );
}
