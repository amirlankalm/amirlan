import { profile } from "@/lib/profile";
import { SoundLink } from "@/components/interactive";

export function LabPage() {
  return (
    <main className="note-page">
      <article>
        <h1>hey, i&apos;m amirlan.</h1>

        <p>
          i&apos;m the co-founder{" "}
          <SoundLink
            className="company-link company-link--geko"
            href="https://geko.sh"
            external
          >
            @geko
          </SoundLink>
          , making human-like voice accessible at scale, to anyone.
        </p>

        <p>
          previously, i was a founding engineer{" "}
          <SoundLink
            className="company-link company-link--speko"
            href="https://speko.ai"
            external
          >
            @speko
          </SoundLink>{" "}
          (yc s26).
        </p>

        <nav className="note-links" aria-label="Links">
          <SoundLink href="/essays">essays</SoundLink>
          <span aria-hidden="true">|</span>
          <SoundLink href="https://x.com/amirlankalm" external>
            x.com
          </SoundLink>
          <span aria-hidden="true">|</span>
          <SoundLink href="https://github.com/amirlankalm" external>
            github
          </SoundLink>
          <span aria-hidden="true">|</span>
          <SoundLink href="https://linkedin.com/in/amirlank" external>
            linkedin
          </SoundLink>
          <span aria-hidden="true">|</span>
          <SoundLink href={`mailto:${profile.email}`}>{profile.email}</SoundLink>
        </nav>
      </article>
    </main>
  );
}
