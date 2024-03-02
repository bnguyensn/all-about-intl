export function LocaleSelectInfo() {
  return (
    <div>
      <p>
        Determines the locale used. Your default locale is{' '}
        <b>
          <pre>{navigator.language}</pre>
        </b>
        . A locale identifier consists of:
      </p>
      <ul>
        <li>A language subtag with 2-3 or 5-8 letters (required)</li>
        <li>A script subtag with 4 letters</li>
        <li>A region subtag with either 2 letters or 3 digits</li>
        <li>
          One or more variant subtags, each with either 5-8 alphanumerals or a
          digit followed by 3 alphanumerals
        </li>
        <li>One or more BCP 47 extension sequences</li>
        <li>A private-use extension sequence</li>
      </ul>
      <p>
        Example: <pre>zh-Hans-CN</pre> means Chinese (language) written in
        simplified characters (script) as used in China (region).<pre></pre>
      </p>
    </div>
  );
}
