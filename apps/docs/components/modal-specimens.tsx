'use client';
import {
  createContext,
  useContext,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';
import {
  Alert,
  Badge,
  Button,
  Field,
  Input,
  Textarea,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from '@antiflex/ui';

interface SampleProject {
  name: string;
  description: string;
  archived: boolean;
}
const initialProject: SampleProject = {
  name: 'Orbit workspace',
  description: 'The shared foundation for our product.',
  archived: false,
};
const ProjectContext = createContext<{
  project: SampleProject;
  setProject: Dispatch<SetStateAction<SampleProject>>;
} | null>(null);
function useSampleProject() {
  const shared = useContext(ProjectContext);
  const [project, setProject] = useState(initialProject);
  return shared ?? { project, setProject };
}

export function EditProjectDialog({ nested = false }: { nested?: boolean }) {
  const [open, setOpen] = useState(false);
  const { project, setProject } = useSampleProject();
  const saved = project.name;
  const [draft, setDraft] = useState(saved);
  const [draftDescription, setDraftDescription] = useState(project.description);
  const [notice, setNotice] = useState('');
  const nameRef = useRef<HTMLInputElement>(null);
  return (
    <div className="modal-specimen">
      {project.archived ? (
        <p>No active sample projects.</p>
      ) : (
        <div className="modal-project">
          <div>
            <strong>{saved}</strong>
            <p>Sample workspace · changes stay in this page</p>
          </div>
          <Badge variant="success">Active</Badge>
        </div>
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          disabled={project.archived}
          onClick={() => {
            setDraft(saved);
            setDraftDescription(project.description);
            setNotice('');
          }}
        >
          Edit sample project
        </DialogTrigger>
        <DialogContent initialFocusRef={nameRef}>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setProject((current) => ({
                ...current,
                name: draft.trim(),
                description: draftDescription,
              }));
              setNotice('Sample project saved. No server request was made.');
              setOpen(false);
            }}
          >
            <DialogHeader>
              <DialogTitle>Edit project</DialogTitle>
              <DialogDescription>
                Update the details your team sees in this sample workspace.
              </DialogDescription>
            </DialogHeader>
            <DialogBody>
              <Field label="Project name" required>
                <Input
                  ref={nameRef}
                  name="projectName"
                  required
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  pattern={String.raw`.*\S.*`}
                  maxLength={80}
                />
              </Field>
              <Field label="Description" description="A short note for your team.">
                <Textarea
                  name="description"
                  value={draftDescription}
                  onChange={(event) => setDraftDescription(event.target.value)}
                  rows={3}
                />
              </Field>
              {nested && (
                <AlertDialog>
                  <AlertDialogTrigger variant="ghost">Reset draft</AlertDialogTrigger>
                  <AlertDialogContent size="sm">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Reset this draft?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This only resets the unsaved sample name. Your saved project is unchanged.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Keep editing</AlertDialogCancel>
                      <AlertDialogAction onClick={() => setDraft(saved)}>
                        Reset draft name
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </DialogBody>
            <DialogFooter>
              <DialogClose>Cancel</DialogClose>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <p role="status" className="modal-result">
        {notice}
      </p>
    </div>
  );
}
export function ArchiveProjectDialog() {
  const { project, setProject } = useSampleProject();
  const archived = project.archived;
  const setArchived = (next: boolean) => setProject((current) => ({ ...current, archived: next }));
  const restoreRef = useRef<HTMLButtonElement>(null);
  return (
    <div className="modal-specimen">
      <p>Try a reversible, local confirmation. No real project is affected.</p>
      <AlertDialog>
        <AlertDialogTrigger variant="danger" disabled={archived}>
          Archive sample project
        </AlertDialogTrigger>
        <AlertDialogContent size="sm" returnFocusRef={restoreRef}>
          <AlertDialogHeader>
            <AlertDialogTitle>Archive {project.name}?</AlertDialogTitle>
            <AlertDialogDescription>
              The sample project will leave this page’s active list. You can restore it using the
              action shown afterwards.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep project</AlertDialogCancel>
            <AlertDialogAction onClick={() => setArchived(true)}>Archive project</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {archived && (
        <Alert title="Sample project archived" variant="success" role="status">
          This change is local.{' '}
          <Button ref={restoreRef} variant="ghost" onClick={() => setArchived(false)}>
            Restore sample project
          </Button>
        </Alert>
      )}
    </div>
  );
}
export function LongDialog() {
  const title = useRef<HTMLHeadingElement>(null);
  return (
    <Dialog>
      <DialogTrigger variant="secondary">Read sample review</DialogTrigger>
      <DialogContent size="lg" initialFocusRef={title} aria-describedby="">
        <DialogHeader>
          <DialogTitle ref={title}>Review before continuing</DialogTitle>
          <DialogDescription>
            A long-content example with focus placed at the start.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          {Array.from({ length: 8 }, (_, i) => (
            <section key={i}>
              <h3>Review topic {i + 1}</h3>
              <p>
                This sample describes how shared components keep workspace screens consistent. Read
                each section at your own pace. The modal scrolls within the available viewport, and
                the page behind it stays still.
              </p>
            </section>
          ))}
        </DialogBody>
        <DialogFooter>
          <DialogClose>Finish review</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export function ModalComponentDemo({ name }: { name: string }) {
  return name === 'alert-dialog' ? <ArchiveProjectDialog /> : <EditProjectDialog nested />;
}
export function ModalExample() {
  const [project, setProject] = useState(initialProject);
  return (
    <ProjectContext.Provider value={{ project, setProject }}>
      <div className="modal-example">
        <EditProjectDialog nested />
        <hr />
        <ArchiveProjectDialog />
        <hr />
        <LongDialog />
      </div>
    </ProjectContext.Provider>
  );
}
