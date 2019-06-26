import { currentURL } from '@ember/test-helpers';
import { Promise } from 'rsvp';
import { module } from 'qunit';
import { setupApplicationTest, test } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import Path from 'nomad-ui/tests/pages/allocations/task/fs/path';

let allocation;
let task;

module('Acceptance | task fs path', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(async function() {
    server.create('agent');
    server.create('node', 'forceIPv4');
    const job = server.create('job', { createAllocations: false });

    allocation = server.create('allocation', { jobId: job.id, clientStatus: 'running' });
    task = server.schema.taskStates.where({ allocationId: allocation.id }).models[0];
  });

  test('visiting /allocations/:allocation_id/:task_name/fs/:path', async function(assert) {
    const paths = ['some-file.log', 'a/deep/path/to/a/file.log', '/', 'Unicode™®'];

    const testPath = async filePath => {
      await Path.visit({ id: allocation.id, name: task.name, path: filePath });
      assert.equal(
        currentURL(),
        `/allocations/${allocation.id}/${task.name}/fs/${encodeURIComponent(filePath)}`,
        'No redirect'
      );
      assert.equal(Path.breadcrumbsText, `${task.name} ${filePath.replace(/\//g, ' ')}`.trim());
    };

    await paths.reduce(async (prev, filePath) => {
      await prev;
      return testPath(filePath);
    }, Promise.resolve());
  });

  test('navigating allocation filesystem', async function(assert) {
    await Path.visit({ id: allocation.id, name: task.name, path: '/' });

    assert.ok(Path.fileViewer.isHidden);

    assert.equal(Path.directoryEntries.length, 4);

    assert.equal(Path.breadcrumbsText, task.name);

    assert.equal(Path.breadcrumbs.length, 1);
    assert.ok(Path.breadcrumbs[0].isActive);
    assert.equal(Path.breadcrumbs[0].text, task.name);

    assert.equal(Path.directoryEntries[0].name, 'directory', 'directories should come first');
    assert.ok(Path.directoryEntries[0].isDirectory);
    assert.equal(Path.directoryEntries[0].size, '', 'directory sizes are hidden');
    assert.equal(Path.directoryEntries[0].lastModified, 'a year ago');

    assert.equal(Path.directoryEntries[2].name, '🤩.txt');
    assert.ok(Path.directoryEntries[2].isFile);
    assert.equal(Path.directoryEntries[2].size, '1 KiB');
    assert.equal(Path.directoryEntries[2].lastModified, '2 days ago');

    assert.equal(Path.directoryEntries[3].name, '🙌🏿.txt');

    await Path.directoryEntries[0].visit();

    assert.equal(Path.directoryEntries.length, 1);

    assert.equal(Path.breadcrumbs.length, 2);
    assert.equal(Path.breadcrumbsText, `${task.name} directory`);

    assert.notOk(Path.breadcrumbs[0].isActive);

    assert.equal(Path.breadcrumbs[1].text, 'directory');
    assert.ok(Path.breadcrumbs[1].isActive);

    await Path.directoryEntries[0].visit();

    assert.equal(Path.directoryEntries.length, 1);

    assert.equal(Path.breadcrumbs.length, 3);
    assert.equal(Path.breadcrumbsText, `${task.name} directory another`);
    assert.equal(Path.breadcrumbs[2].text, 'another');

    await Path.breadcrumbs[1].visit();
    assert.equal(Path.breadcrumbsText, `${task.name} directory`);
    assert.equal(Path.breadcrumbs.length, 2);
  });

  test('viewing a file', async function(assert) {
    await Path.visit({ id: allocation.id, name: task.name, path: '/' });
    await Path.directoryEntries[2].visit();

    assert.equal(Path.breadcrumbsText, `${task.name} 🤩.txt`);

    assert.ok(Path.fileViewer.isPresent);
  });

  test('viewing an empty directory', async function(assert) {
    await Path.visit({ id: allocation.id, name: task.name, path: '/empty-directory' });

    assert.equal(Path.directoryEntries.length, 1);
    assert.ok(Path.directoryEntries[0].isEmpty);
  });
});